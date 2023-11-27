import React, {FC, useRef} from "react";
import style from "../BurgerConstructor/BurgerConstructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {DropTargetMonitor, useDrag, useDrop} from "react-dnd";
import {Tingredient} from "../../utils/interfaces";

interface IConstructorElementWrapperProps{
    item: Tingredient ;
    index: number;
    moveConstructorIngredient: (dragIndex: number, hoverIndex: number) => void;
    handleRemoveIngredien: (item: Tingredient) => void;
}

export const  ConstructorElementWrapper:FC<IConstructorElementWrapperProps> = ({item, index, moveConstructorIngredient, handleRemoveIngredien}) => {
    const ref = useRef<HTMLDivElement>(null)

    //TODO: не понимаю как это исправить
    // @ts-ignore
    const [{ handlerId }, drop] = useDrop({
        accept: ['main', 'sauce'],
        collect(monitor:DropTargetMonitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        //TODO: не понимаю как это исправить
        // @ts-ignore
        hover(item: {index: number}, monitor:DropTargetMonitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index//index
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            // @ts-ignore
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            moveConstructorIngredient(dragIndex, hoverIndex)
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })
    //TODO: не понимаю как это исправить
    // @ts-ignore
    const [{ isDragging }, drag] = useDrag({
        //TODO: не понимаю как это исправить
        // @ts-ignore
        type: item.type,
        item:() => {
            return { key: item.key, index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const opacity:number = isDragging ? 0 : 1
    drag(drop(ref))
    return (
        <div ref={ref} style={{ opacity }} data-handler-id={handlerId} className={`${style.itemWr}  ${isDragging && style.onHover}`} >
            <span className={style.drugIcon}><DragIcon type="primary"/></span>
            <ConstructorElement
                isLocked={false}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => handleRemoveIngredien(item)}
            />
        </div>
    )

}
