"use client";

type Props = {
  label?: string
  id: string;
  onChangeEvent: React.ChangeEventHandler<HTMLInputElement>
}

export default function TextField({ label, id, onChangeEvent }: Props) {
  return (
    <div> {label && <label htmlFor={id}>{label}</label>}
      <input id={id} type="text" className="bg-white border-solid ratio rounded-md" onChange={(e) => onChangeEvent(e)} />
    </div>)
}