import { Subject } from 'rxjs';
export const subscriber = new Subject(0);
export const messageService = (msg) => {
	subscriber.next(msg);
};
