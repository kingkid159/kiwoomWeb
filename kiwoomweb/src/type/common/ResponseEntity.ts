export default interface ResponseEntity<T = any> {
  message: string;
  success: boolean;
  data: any;
}
