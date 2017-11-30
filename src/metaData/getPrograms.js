// @flow
import chunk from '../utils/chunk';

import metaProgramsSpec from '../api/apiSpecifications/metaPrograms.apiSpecification';
import programsSpec from '../api/apiSpecifications/programs.apiSpecification';
import getProgramsLoadSpecification from '../apiToStore/loadSpecifications/getProgramsLoadSpecification';

import StorageContainer from '../storage/StorageContainer';

const batchSize = 2;

async function getMissingPrograms(programs, storageContainer: StorageContainer, store: string) {
    if (!programs) {
        return null;
    }

    const storePrograms = [];
    await Promise.all(
        programs.map(
            program => storageContainer
                .get(store, program.id)
                .then(storeProgram => storePrograms.push(storeProgram)),
        ),
    );

    const missingPrograms = programs.filter((program, index) => {
        const storeProgram = storePrograms[index];
        return !storeProgram || storeProgram.version !== program.version;
    });

    return missingPrograms.length > 0 ? missingPrograms : null;
}

function getPrograms(programs, store, storageContainer) {
    programsSpec.updateQueryParams({
        filter: `id:in:[${programs.map(program => program.id.toString())}]`,
    });

    const programsLoadSpecification = getProgramsLoadSpecification(store, programsSpec);
    return programsLoadSpecification.load(storageContainer);
}

export default async function getProgramsData(storageContainer: StorageContainer, store: string) {
    const metaPrograms = await metaProgramsSpec.get();
    const missingPrograms = await getMissingPrograms(metaPrograms, storageContainer, store);

    const programBatches = chunk(missingPrograms, batchSize);

    await Promise.all(
        programBatches.map(
            batch =>
                getPrograms(batch, store, storageContainer)
                    .then(programs => programs),
        ),
    );
}
