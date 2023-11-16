

const ListComp = () =>{
  return(
      <>
      <div className="tableComp">
        <ol>
          <ListOFnumber data={"fgghsfggdghfg"} />
          <ListOFnumber data={"fgghsfggdghfg"} />
          <ListOFnumber data={"fgghsfggdghfg"} />
          <ListOFnumber data={"fgghsfggdghfg"} />
          <ListOFnumber data={"fgghsfggdghfg"} />
          <ListOFnumber data={"fgghsfggdghfg"} />
          <ListOFnumber data={"fgghsfggdghfg"} />
        </ol>
      </div>
    </>
  )
}

export default ListComp


function ListOFnumber(props) {
  return (
    <>
      <li>{props.data}</li>
    </>
  );
}