export class UnauthorizedError extends Error {
	constructor(message = 'You are unauthorized to do this') {
		super(message);
		this.name = 'UnauthorizedError';
	}
}
