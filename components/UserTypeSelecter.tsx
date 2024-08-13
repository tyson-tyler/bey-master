import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UserTypeSelector = ({
  userType,
  setUserType,
  onClickHandler,
}: UserTypeSelectorParams) => {
  const accessChangeHandler = (type: UserType) => {
    setUserType(type);
    onClickHandler && onClickHandler(type);
  };

  return (
    <Select
      value={userType}
      onValueChange={(type: UserType) => accessChangeHandler(type)}
    >
      <SelectTrigger className="w-[37%] bg-gray-700 text-white border-none flex  items-center bg-transparent">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="border-gray-700 bg-gray-700">
        <SelectItem
          value="viewer"
          className="shad-select-item bg-gray-700 text-white"
        >
          can view
        </SelectItem>
        <SelectItem
          value="editor"
          className="shad-select-item bg-gray-700 text-white"
        >
          can edit
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default UserTypeSelector;
