"use client";
import { ObjectCreateForm } from "@/components/object-create-form";
import { ObjectSelector } from "@/components/object-selector";
import { SimpleButton } from "@/components/simple-button";
import { VidList } from "@/components/vid-list";
import { Client } from "@/lib/client/client";
import { Item } from "@/lib/models/item";
import { User } from "@/lib/models/user";
import { Vid } from "@/lib/models/vid";
import { shortUuid } from "@/lib/utilities/format-utilities";
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

      setCurrentVid(vid);
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
    <div className="flex h-screen bg-stone-100 selection:bg-blue-500 selection:text-stone-100">
      <div className="flex h-screen w-screen flex-col items-center justify-center font-manrope text-stone-800">
        <div>
          {match(mode)
            .with("home", () => (
              <div className="flex flex-col items-center gap-8">
                <div className="flex flex-row gap-10">
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
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    <div className="items-center justify-self-end border-r-2 border-stone-400 pr-4">
                      VID
                    </div>
                    <div className="font-geist-mono text-xs">
                      {shortUuid(currentVid.id)}
                    </div>

                    <div className="items-center justify-self-end border-r-2 border-stone-400 pr-4">
                      user
                    </div>
                    <div>
                      <div className="">
                        {currentVidUser === null
                          ? "unknown"
                          : currentVidUser.name}
                      </div>

                      <div className="font-geist-mono text-xs">
                        {shortUuid(currentVid.userId)}
                      </div>
                    </div>

                    <div className="items-center justify-self-end border-r-2 border-stone-400 pr-4">
                      item
                    </div>
                    <div>
                      <div className="">
                        {currentVidItem === null
                          ? "unknown"
                          : currentVidItem.name}
                      </div>

                      <div className="font-geist-mono text-xs">
                        {shortUuid(currentVid.itemId)}
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
