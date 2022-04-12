export default function Message({ message, own }) {
  return (
    <div className={`flex flex-column w-full p-3 ${own ? "justify-end" : ""}`}>
      <p
        className={`${own ? "bg-gray-200" : "bg-blue-400"}
          ${own ? "text-black" : "text-white"}
         p-2 my-2 rounded-md w-fit max-w-[300px]`}
      >
        {message.text}
      </p>
    </div>
  );
}
