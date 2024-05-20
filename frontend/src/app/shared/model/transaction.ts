export class Transaction {
  public id: string | undefined;
  public senderAddress: string | undefined;
  public senderEmail: string | undefined;
  public receiverAddress: string | undefined;
  public receiverEmail: string | undefined;
  public info: string | undefined;
  public timestamp: string | null | undefined;
  public type: string | undefined;
  public reason: string | undefined;
}
