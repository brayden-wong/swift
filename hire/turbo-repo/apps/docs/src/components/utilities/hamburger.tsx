type MenuProps = {
  swap: boolean;
  setSwap: () => void;
};

export default ({ swap, setSwap }: MenuProps) => {
  return (
    <div
      className="z-50 ml-auto mr-8 flex flex-col space-y-1 hover:cursor-pointer"
      onClick={setSwap}
    >
      <span
        className={`${
          swap
            ? "block h-1 w-8 translate-y-2 -rotate-45 rounded-full bg-white duration-300"
            : "block h-1 w-8 rounded-full bg-indigo-500 duration-300"
        }`}
      />
      <span
        className={`${
          swap
            ? "block h-1 w-8 translate-x-full rounded-full bg-white opacity-0 duration-500"
            : "block h-1 w-8 rounded-full bg-indigo-500 duration-500"
        }`}
      />
      <span
        className={`${
          swap
            ? "block h-1 w-8 -translate-y-2 rotate-45 rounded-full bg-white duration-300"
            : "block h-1 w-8 rounded-full bg-indigo-500 duration-300"
        }`}
      />
    </div>
  );
};
