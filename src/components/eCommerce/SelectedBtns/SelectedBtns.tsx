import style from "./style.module.css";

const { collectionOfBtns, activeBtn } = style;

type TSelectedBtns = { id: number; Name: string }[];

interface IProps {
  listOfItems: TSelectedBtns;
  label: string;
  itemsId: number[];
  setItemsId: (value: number[]) => void;
  error?: string;

}

export default function SelectedBtns({
  listOfItems,
  label,
  setItemsId,
  itemsId,
  error,

}: IProps) {
  const handleAddItems = (itemId: number) => {
    let items: number[] = itemsId || [];
    if (items.includes(itemId)) {
      items = items.filter((item) => item !== itemId);
      setItemsId(items);
    } else {
      setItemsId([...items, itemId]);
    }
  };

  return (
    <div className={collectionOfBtns}>
      <h2>{label}</h2>
      <p>
        {listOfItems.map((item) => (
          <button
            className={itemsId.includes(item.id) ? `${activeBtn}` : ""}
            key={item.id}
            type="button"
            onClick={() => {
              
              handleAddItems(item.id);
            }}
          >
            {item.Name}
          </button>
        ))}
      </p>
      {error && <span>{error}</span>}
    </div>
  );
}
