import { useState, useEffect } from 'react';
// takes an observable<string[]>, defines and returns a state
// and defines useEffect to subscribe/unsubscribe to the observable
// in order to consume observable items via setState callback
export const useSubject = (subject) => {
	// state is initialized as undefined (empty value)
	const [state, setState] = useState(0);

	useEffect(() => {
		const subscription = subject.subscribe(setState);
		return () => subscription.unsubscribe();
	}, [subject]);

	return state;
};
