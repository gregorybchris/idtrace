import { User } from "@/lib/models/user";
import { Nullable } from "@/lib/utilities/type-utilities";
import { UserIndicator } from "./user-indicator";

type UserPickerProps = {
  users: User[];
  currentUser: Nullable<User>;
  onPick: (user: Nullable<User>) => void;
};

export function UserPicker({ users, currentUser, onPick }: UserPickerProps) {
  function onPickUser(user: User) {
    if (currentUser !== null && user.id === currentUser.id) {
      onPick(null);
    } else {
      onPick(user);
    }
  }

  return (
    <div>
      {users.length === 0 ? (
        <div>no users yet</div>
      ) : (
        <div className="flex flex-row gap-1">
          {users.map((user) => (
            <div key={user.id}>
              <UserIndicator
                user={user}
                current={currentUser !== null && user.id === currentUser.id}
                onClick={() => onPickUser(user)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
