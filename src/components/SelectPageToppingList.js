import React, { useState } from "react";
import styled from "styled-components";
import expand from "img/select/expand.png";
import contract from "img/select/contract.png";
import dough from "img/select/dough.png";
import large_steak from "img/sample/large_steak.png";
import steak from "img/sample/steak.png";
import { useDrag, useDrop } from "react-dnd";
import itemTypes from "../constants/itemTypes";

export default function SelectPageToppingList() {
  const [open, setOpen] = useState(true);
  const [{ isDragging }, drag] = useDrag({
    item: { type: itemTypes.IMAGE_small },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: itemTypes.IMAGE_small,
    drop: () => ({ name: "dough" }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true })
    })
  });

  return (
    <SelectTopping>
      <div className="topping-small-container">
        {open && (
          <div className="topping-box">
            <div className="topping-flavor">맛(4)</div>
            <div className="topping-cheese">치즈(19)</div>
            <div className="topping-meat">
              고기(8)
              <img
                src={steak}
                ref={drag}
                style={{
                  opacity: isDragging ? 0.5 : 1,
                  cursor: "move"
                }}
              />
              <img src={steak} />
              <img src={steak} />
              <img src={steak} />
              <img src={steak} />
              <img src={steak} />
            </div>
            <div className="topping-seafood">해산물(5)</div>
            <div className="topping-vegetable">야채(16)</div>

            <div className="topping-etc">기타(7)</div>
          </div>
        )}
        <div
          className="expand-topping"
          onClick={() => setOpen(!open)}
          open={open}
        >
          {!open ? (
            <img src={contract} className="contract" alt="contract" />
          ) : (
            <img src={expand} className="expand" alt="expand" />
          )}
        </div>
      </div>
      <div className="topping-big-container">
        <img src={dough} className="dough" alt="dough" ref={drop} />
        <div className="topping-big">
          <img src={large_steak} className="large_steak" />
        </div>
      </div>
    </SelectTopping>
  );
}

const SelectTopping = styled.div`
  .topping-small-container {
    display: flex;
    align-items: center;
    width: 456px;
    height: 100vh;
  }
  .dough {
    width: 75%;
    height: 58%;
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: -4000;
  }
  .topping-box {
    width: 396px;
    height: 100vh;
    background: rgba(51, 34, 28, 0.9);
    overflow: hidden;
    color: #fff;
  }
  .expand-topping {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    right: 30px;
    position: relative;
    background: rgba(51, 34, 28, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    curser: pointer;
  }
  .expand,
  .contract {
    width: 20%;
    height: 30%;
    position: relative;
    left: 10px;
  }
  .large_steak {
    width: 75%;
    height: 58%;
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: -3000;
  }
`;
