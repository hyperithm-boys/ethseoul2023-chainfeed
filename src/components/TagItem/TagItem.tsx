import classNames from "classnames";

const TagItem = (props: {
  tag: string;
  isSelected: boolean;
  setTag: () => void;
}) => {
  const { tag, isSelected, setTag } = props;

  return (
    <div
      className={classNames(
        "h-16 p-2 flex items-center flex-shrink-0 font-georgia font-sm hover:cursor-pointer hover:bg-black hover:text-slate-200 hover:border-transparent",
        {
          "bg-black text-slate-200": isSelected,
          "border-y border-r border-black text-slate-700": !isSelected,
        }
      )}
      onClick={setTag}
    >
      {tag}
    </div>
  );
};

export default TagItem;
