import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import './test.css'

const TestButi = () => {
  const it = {
    items: [
      {
        id : 1,
        content : 'item1'
      },
      {
        id : 2,
        content : 'item2'
      },
      {
        id : 3,
        content : 'item3'
      },
      {
        id : 4,
        content : 'item4'
      },
    ],
    selected: [
      {
        id : 5,
        content : 'item5'
      },
      {
        id : 6,
        content : 'item6'
      },
      {
        id : 7,
        content : 'item7'
      },
      {
        id : 8,
        content : 'item8'
      },
    ]
  }
  
  const drp = {
    droppable: 'items',
    droppable2: 'selected'
  }
  
  const [itState , setItState] = useState(it)
  const [id2List , setId2List] = useState(drp)

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  }

  const getItemStyle = (isDragging, draggingStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    float : 'left',

    // styles we need to apply on draggables
    ...draggingStyle
  })

  const getListStyle = () => ({
    //display: 'flex',
    overflow: 'auto',
  })


  const getList = id => itState[id2List[id]]

  const getItem = (other,dId) => {
    const result = {
      index : other,
      droppableId : dId
    }
    console.log('getItem -> ',result)
    return result
  }

  const onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
        return;
    }

    if (source.droppableId === destination.droppableId) {
        const items = reorder(
            getList(source.droppableId),
            source.index,
            destination.index
        );

        let state = { items };

        if (source.droppableId === 'droppable2') {
            state = { selected: items };
        }

        setItState(state);
    } else {
      
        const result = move(
            getList(source.droppableId),
            getList(destination.droppableId),
            source,
            destination
        );
        console.log('source ->',source)
        console.log('destination ->',destination)
        if(result.droppable.length > 5) {
          console.log('inIf ->',result)
          const result2 = move(
            getList('droppable'),
            getList('droppable2'),
            getItem(result.droppable.length-1,'droppable'),
            getItem(0,'droppable2'),
        );
        
        console.log('result2 ->',result2)
        setItState({
          items: result2.droppable,
          selected: result2.droppable2
        });
        } else { 
          setItState({
          items: result.droppable,
          selected: result.droppable2
        });
      }
    }
}
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
    return (
      <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}>
              {itState.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                        <div className = 'h-con'
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                            )}>
                            <div className ='d-item'>
                                {item.content}
                            </div>
                       </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="droppable2" direction="horizontal">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}>
              {itState.selected.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                        <div className = 'h-con'
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                            )}>
                            <div className ='d-item'>
                                {item.content}
                            </div>
                       </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      </div>
    );
  }

export default TestButi;