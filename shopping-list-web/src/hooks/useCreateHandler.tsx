import { Handler } from "../handles/handler";

export const useCreateHandler = () => {
    const handler = new Handler();

    return {handler};
}