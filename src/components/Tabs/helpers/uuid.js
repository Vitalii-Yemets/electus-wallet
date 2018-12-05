let count = 0;

export default function uuid() {
	return `tabs-${count++}`;
}

export const reset = () => {
	count = 0;
};
