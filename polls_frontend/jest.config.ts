import { compilerOptions } from "./tsconfig.json";

import type {Config} from 'jest';
import {pathsToModuleNameMapper} from "ts-jest";

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, { prefix: '<rootDir>/' }),
    setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
    verbose: true,
};

export default config;
