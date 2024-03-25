import { CheckCircleIcon, TriangleAlertIcon } from "lucide-react";

export default function FormState(props: {
  message: string;
  type: "success" | "error";
}) {
  return (
    <div
      className={`${
        props?.type == "success"
          ? "bg-emerald-100 text-emerald-700"
          : "bg-red-100 text-red-700"
      } p-3 flex items-center gap-2 text-sm rounded-md`}
    >
      {props?.type == "success" ? (
        <CheckCircleIcon className="w-4 h-4" />
      ) : (
        <TriangleAlertIcon className="w-4 h-4" />
      )}
      <p>{props?.message}</p>
    </div>
  );
}
