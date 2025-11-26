export default interface ResponseEntity<T = unknown> {
    message: string;
    success: boolean;
    data: T;
}
