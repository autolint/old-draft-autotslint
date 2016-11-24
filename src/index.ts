import { AutoMutator } from "automutate/lib/automutator";
import { ConsoleLogger } from "automutate/lib/loggers/consoleLogger";
import { IFileMutationSettings, FileMutationsApplier } from "automutate/lib/mutationsAppliers/fileMutationsApplier";

import { ITslintRunnerSettings, TslintMutationsProvider } from "./tslintMutationsProvider";

/**
 * Settings to run AutoTslint.
 */
export interface IAutoTslintSettings {
    /**
     * Settings to run waves of TSLint.
     */
    linter: ITslintRunnerSettings;

    /**
     * Settings for manipulating local files.
     */
    mutations?: IFileMutationSettings;
}

/**
 * Runs waves of file mutations to fix linting complaints.
 */
export class AutoTslinter extends AutoMutator {
    /**
     * Initializes a new instance of the AutoTslinter class.
     * 
     * @param settings   Settings to run AutoTslint.
     */
    public constructor(settings: IAutoTslintSettings) {
        const logger: ConsoleLogger = new ConsoleLogger();

        super(
            new FileMutationsApplier(logger, settings.mutations),
            new TslintMutationsProvider(settings.linter),
            logger);
    }
}