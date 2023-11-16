import React, {useState} from "react";
import {Tooltip, Tag, List, Button, Popconfirm, Switch} from "antd";
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { LIST_IGNORE } from "antd/es/upload/Upload";

const FilmItem = ({film, onFilmRevoval, onFilmToggle}) => {
    return (
        <List actions={[
            <Tooltip title={film.completed ? 'Pažymėti kaip neperžiūrėtą' : 'Pažymėti kaip peržiūrėtą'}>
                <Switch 
                checkedChildren={<CheckOutlined/>} 
                unCheckedChildren={<CloseOutlined/>}
                onChange={() => onFilmToggle(film)}
                defaultChecked={film.completed}
                />
            </Tooltip>, 
            <Popconfirm title={'Ar tikrai norite ištrinti?'} onConfirm={() => {onFilmRevoval(film);}}>
                <Button className="remove-film-button" type="primary" danger>
                    X
                </Button>
            </Popconfirm>
         ]}
         className="list-item" key={film.id}
         >
            <div className="film-item">
                <Tag color={film.completed ? 'cyan' : 'red'} className="film-tag">
                    {film.title}
                </Tag>
            </div>   
        </List>
    )
}

export default FilmItem;