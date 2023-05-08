import { IListInfo } from "@pnp/sp/lists";
import * as React from "react";
import { Details } from "../Details/Details";
import { ListViews } from "../ListViews/ListViews";

interface IListDetailsProps {
  list: IListInfo;
}

export function ListDetails(props: IListDetailsProps) {
  const listViewsRef = React.useRef<typeof ListViews>();

  const { list } = props;

  async function loadViews(listId: string) {
    console.log`Loading views for: ${listId}`;
  }
  
  function _onToggleAll(checked: boolean, listId: string) {
    console.log("on toggle all", listViewsRef);
    (listViewsRef.current as any).toggleAll();
  }

  return <Details 
    title       = {list.Title}
    onOpen      = {() => loadViews(list.Id)}
    onToggleAll = {(checked) => _onToggleAll(checked, list.Id)}
  > 
    <ListViews listId={list.Id} ref={listViewsRef}/>
  </Details>
}