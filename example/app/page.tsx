"use client";
import { MessageList } from "@/components/message-list";
import { ObjectCreateForm } from "@/components/object-create-form";
import { ObjectSelector } from "@/components/object-selector";
import { SimpleButton } from "@/components/simple-button";
import { UserPicker } from "@/components/user-picker";
import { Client } from "@/lib/client/client";
import { Item } from "@/lib/models/item";
import { Message } from "@/lib/models/message";
import { User } from "@/lib/models/user";
import { Nullable } from "@/lib/utilities/type-utilities";
import { useRef, useState } from "react";
import { match } from "ts-pattern";

type Mode = "home" | "create-user" | "create-item";

export default function HomePage() {
  const [mode, setMode] = useState<Mode>("home");
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [currentUser, setCurrentUser] = useState<Nullable<User>>(null);
  const [selectedUser, setSelectedUser] = useState<Nullable<User>>(null);
  const [selectedItem, setSelectedItem] = useState<Nullable<Item>>(null);
  const client = useRef<Client>(new Client());

  function addUser(user: User) {
    setUsers((prev) => [...prev, user]);
  }

  function addItem(item: Item) {
    setItems((prev) => [...prev, item]);
  }

  const canSendMessage =
    currentUser !== null && selectedUser !== null && selectedItem !== null;

  function sendMessage() {
    if (!canSendMessage) {
      return;
    }

    client.current.postVid(currentUser.id, selectedItem.id).then((vid) => {
      console.log("Created VID: ", vid);
      const message: Message = {
        fromUser: currentUser,
        toUser: selectedUser,
        item: selectedItem,
        vid: vid,
      };
      setMessages((prev) => [...prev, message]);
    });
  }

  return (
    <div className="flex h-screen bg-stone-100">
      <div className="flex h-screen w-screen flex-col items-center justify-center font-manrope text-stone-800">
        <div>
          {match(mode)
            .with("home", () => (
              <div className="flex flex-col gap-8">
                <div className="flex flex-row gap-5">
                  <ObjectSelector
                    title="users"
                    objects={users}
                    selectedObject={selectedUser}
                    onSelect={setSelectedUser}
                    onAdd={() => setMode("create-user")}
                    onDelete={(object) =>
                      setUsers(users.filter((x) => x.id !== object.id))
                    }
                  />
                  <ObjectSelector
                    title="items"
                    objects={items}
                    selectedObject={selectedItem}
                    onSelect={setSelectedItem}
                    onAdd={() => setMode("create-item")}
                    onDelete={(object) =>
                      setItems(items.filter((x) => x.id !== object.id))
                    }
                  />
                  <MessageList
                    client={client.current}
                    currentUser={currentUser}
                    messages={messages}
                  />
                </div>

                <SimpleButton
                  text="send message"
                  onClick={sendMessage}
                  enabled={canSendMessage}
                />

                <div className="flex flex-row items-center gap-10">
                  <UserPicker
                    users={users}
                    currentUser={currentUser}
                    onPick={setCurrentUser}
                  />

                  <div>
                    {currentUser !== null && (
                      <div>current: {currentUser.name}</div>
                    )}
                  </div>
                </div>
              </div>
            ))
            .with("create-user", () => (
              <ObjectCreateForm
                title="create user"
                onCreate={addUser}
                onClose={() => setMode("home")}
              />
            ))
            .with("create-item", () => (
              <ObjectCreateForm
                title="create item"
                onCreate={addItem}
                onClose={() => setMode("home")}
              />
            ))
            .exhaustive()}
        </div>
      </div>
    </div>
  );
}
