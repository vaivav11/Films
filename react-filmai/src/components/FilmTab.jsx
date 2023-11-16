import React, {useEffect} from "react";
import { Tabs, Layout, Row, Col, List } from "antd";
import FilmItem from './FilmItem';

const FilmTab = (films, onFilmRevoval, onFilmToggle) => {
    return (
        <>
            <List locale={{"emptyText": "Filmų sąrašas tusčias"}} 
            dataSource={films}
            renderItem={(film) => {
                <FilmItem film={film} onFilmToggle={onFilmToggle} onFilmRevoval={onFilmRevoval}/>
            }}
            pagination={{
                position: 'bottom',
                pageSize: 10
            }}
            />
        </>
    )
}

export default FilmTab;