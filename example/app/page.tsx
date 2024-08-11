"use client";
import { ObjectCreateForm } from "@/components/object-create-form";
import { ObjectSelector } from "@/components/object-selector";
import { SimpleButton } from "@/components/simple-button";
import { VidList } from "@/components/vid-list";
import { Client } from "@/lib/client/client";
import { Item } from "@/lib/models/item";
import { User } from "@/lib/models/user";
import { Vid } from "@/lib/models/vid";
import { Nullable } from "@/lib/utilities/type-utilities";
import { useEffect, useRef, useState } from "react";
import { match } from "ts-pattern";

type Mode = "home" | "create-user" | "create-item";

export default function HomePage() {
  const [mode, setMode] = useState<Mode>("home");
  const [users, setUsers] = useState<User[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [currentUser, setCurrentUser] = useState<Nullable<User>>(null);
  const [currentItem, setCurrentItem] = useState<Nullable<Item>>(null);
  const [vids, setVids] = useState<Vid[]>([]);
  const [currentVid, setCurrentVid] = useState<Nullable<Vid>>(null);
  const client = useRef<Client>(new Client());

  const canCreateVid = currentUser !== null && currentItem !== null;

  useEffect(() => {
    fetchVids();
  }, [currentUser, currentItem]);

  function fetchVids() {
    if (currentUser === null && currentItem === null) {
      client.current.getAllVids().then((vids) => {
        console.log("Fetched VIDs: ", vids);
        setVids(vids);
      });
    } else if (currentUser !== null && currentItem === null) {
      client.current.getUserVids(currentUser.id).then((vids) => {
        console.log("Fetched VIDs: ", vids);
        setVids(vids);
      });
    } else if (currentUser === null && currentItem !== null) {
      client.current.getItemVids(currentItem.id).then((vids) => {
        console.log("Fetched VIDs: ", vids);
        setVids(vids);
      });
    } else if (currentUser !== null && currentItem !== null) {
      client.current.getVids(currentUser.id, currentItem.id).then((vids) => {
        console.log("Fetched VIDs: ", vids);
        setVids(vids);
      });
    }
  }

  function addUser(user: User) {
    setUsers((prev) => [...prev, user]);
  }

  function deleteUser(user: User) {
    if (currentUser?.id === user.id) {
      setCurrentUser(null);
    }
    setUsers(users.filter((x) => x.id !== user.id));
  }

  function addItem(item: Item) {
    setItems((prev) => [...prev, item]);
  }

  function deleteItem(item: Item) {
    if (currentItem?.id === item.id) {
      setCurrentItem(null);
    }
    setItems(items.filter((x) => x.id !== item.id));
  }

  function createVid() {
    if (!canCreateVid) {
      return;
    }

    client.current.postVid(currentUser.id, currentItem.id).then((vid) => {
      console.log("Created VID: ", vid);
      fetchVids();
    });
  }

  function deleteVid(vid: Vid) {
    if (currentVid?.id === vid.id) {
      setCurrentVid(null);
    }
    client.current.deleteVid(vid.userId, vid.itemId).then(() => {
      console.log("Deleted VID: ", vid.id);
      fetchVids();
    });
  }

  function selectVid(vid: Vid) {
    if (currentVid?.id === vid.id) {
      setCurrentVid(null);
      return;
    }
    setCurrentVid(vid);
  }

  const currentVidUser =
    currentVid === null
      ? null
      : users.find((x) => x.id === currentVid.userId) || null;

  const currentVidItem =
    currentVid === null
      ? null
      : items.find((x) => x.id === currentVid.itemId) || null;

  return (
    <div className="flex h-screen bg-stone-100">
      <div className="flex h-screen w-screen flex-col items-center justify-center font-manrope text-stone-800">
        <div>
          {match(mode)
            .with("home", () => (
              <div className="flex flex-col items-center gap-8">
                <div className="flex flex-row gap-5">
                  <ObjectSelector
                    title="users"
                    objects={users}
                    currentObject={currentUser}
                    onSelect={setCurrentUser}
                    onAdd={() => setMode("create-user")}
                    onDelete={deleteUser}
                  />
                  <ObjectSelector
                    title="items"
                    objects={items}
                    currentObject={currentItem}
                    onSelect={setCurrentItem}
                    onAdd={() => setMode("create-item")}
                    onDelete={deleteItem}
                  />
                  <VidList
                    vids={vids}
                    onDeleteVid={deleteVid}
                    onSelectVid={selectVid}
                  />
                </div>

                <SimpleButton
                  text="create VID"
                  onClick={createVid}
                  enabled={canCreateVid}
                />

                {currentVid && (
                  <div>
                    <div className="flex flex-row items-center gap-2">
                      <div>VID: </div>
                      <div className="font-geist-mono text-xs">
                        {currentVid.id}
                      </div>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                      <div>user: </div>
                      <div className="font-geist-mono text-xs">
                        {currentVidUser === null
                          ? "unknown"
                          : currentVidUser.name}
                      </div>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                      <div>item: </div>
                      <div className="font-geist-mono text-xs">
                        {currentVidItem === null
                          ? "unknown"
                          : currentVidItem.name}
                      </div>
                    </div>
                  </div>
                )}
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
