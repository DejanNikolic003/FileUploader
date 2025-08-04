import { Button } from "antd";

function Item(props) {
  const { children, item, selectedItems, setSelectedItems, save } = props;

  const isSelected = (id) => selectedItems.some((i) => i.id === id);

  const selectItem = (item) => {
    if (isSelected(item.id)) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
      return;
    }

    setSelectedItems((prev) => [...prev, item]);
  };

  const handleChange = (event, id) =>
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, name: event.target.value } : item,
      ),
    );

  const selectedItem = selectedItems.find((i) => i.id === item.id);
  const selected = !!selectedItem;

  return (
    <div>
      {children}
      <Button
        onClick={() => (selected ? save(item.id) : selectItem(item))}
        type="primary"
        color="cyan"
        variant="solid"
      >
        {selected ? "Save" : "Edit"}
      </Button>
      {selected && (
        <div>
          <input
            data-id={item.id}
            type="text"
            placeholder="Enter item name..."
            className="w-full rounded-md border border-gray-200 p-1 text-sm focus:outline-sky-300"
            value={selectedItem?.name}
            onChange={(event) => handleChange(event, item.id)}
          />
        </div>
      )}
    </div>
  );
}

export default Item;
