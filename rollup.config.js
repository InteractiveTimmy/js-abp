export default {
	external: ['express'],
	input: 'dist/index.js',
	output: [
		{
			format: 'umd',
			name: 'JSABP',
			file: 'build/js-abp.js',
			indent: '\t'
		},
		{
			format: 'es',
			file: 'build/js-abp.module.js',
			indent: '\t'
		}
	]
};