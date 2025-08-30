import { defineConfig } from 'vitest/config';

console.log('Vitest configuration loaded! 12345');

export default defineConfig({
	test: {
		// coverage: {
		//   reporter: ['html', 'text'],
		// },
		globals: true,
		fileParallelism: false,
		// setupFiles: ['./tests/testsetup.ts'], //* Path to your setup file
		sequence: {
			shuffle: false, // Ensure tests are not shuffled
			concurrent: false, // Ensure tests run one after another
		},

		// include: ['tests/socket-io-three.test.ts', 'tests/api.test.ts'],
	},
});
