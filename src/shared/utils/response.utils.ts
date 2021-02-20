interface IResponseObject {
	data: any;
	status?: string;
	count?: number;
	http_status?: number;
}

export default function responseObjectDefault({
	data,
	status = 'success',
	count = 1,
	http_status = 200,
}: IResponseObject): IResponseObject {
	return {
		data,
		status,
		count,
		http_status,
	};
}
