import { useSelector } from "react-redux";
import { selectColumns } from "../../redux/columns/selectors.js";
import s from './ColumnList.module.css'

const ColumnList = () => {

    const columns = useSelector(selectColumns);
    return (
        <div className={s.wrapper}>
            <p>columns</p>
            <ul className={s.list}>
                {columns.map(column => (
                    <li key={column._id}>{column.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default ColumnList
