import { createContext } from 'vm';
import { Handler } from '../handles/handler';

interface HandlerContext {
	handler: Handler | undefined;
}

export const HandlerContext = createContext({ handler: undefined });

export const HandlerContextProvider = ({
	children,
}: {
	children: React.ReactElement;
}) => {
	const handler = new Handler();
	return (
		<HandlerContext.Provider value={{ handler }}>
			{children}
		</HandlerContext.Provider>
	);
};
