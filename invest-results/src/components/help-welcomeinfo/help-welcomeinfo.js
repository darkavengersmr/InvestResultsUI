import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import AppHeader from '../app-header';
import { setContextMenu } from "../../redux-store/actions"

const HelpWelcomeInfo = () => { 

    const dispatch = useDispatch();

    useEffect(() => { 
        dispatch(setContextMenu([]));
    // eslint-disable-next-line
    }, [])

    return (
        <>
            <AppHeader name="Справка" /> 
            <Container sx={{ width: 360, mt: "1rem", mb: "2rem" }}>
                
                <Typography variant="h5" component="div" sx={{ mt: "1rem" }}>
                Мои.Инвестиции
                </Typography>

                <Typography variant="body" component="div" sx={{ mt: "0.5rem" }}>
                Приложение предназначено для учета инвестиций и контроля их доходности.
                </Typography>
                
                <Typography variant="body" component="div" sx={{ mt: "0.5rem" }}>
                1. Прежде всего Вам необходимо перейти в раздел "Категории инвестиций" и 
                задать категории,  в которых Вы хотели бы или уже инвестируете, например 
                "Недвижимость", "Ценные бумаги", "Криптовалюты" и т.п.
                </Typography>

                <Typography variant="body" component="div" sx={{ mt: "0.5rem" }}>
                2. Далее переходите в раздел "Мои инвестиции" и создайте новую инвестицию,
                например "Брокерский счет в Тинькофф", указав ее категорию. Появится новая 
                карточка инвестиции. Пока на "счете" 0, поэтому нужно ее пополнить, указав 
                текущую ее стоимость. Если это объект недвижимости, укажите сколько стоит 
                она сейчас.
                </Typography>

                <Typography variant="body" component="div" sx={{ mt: "0.5rem" }}>
                3. Нажмите "Подробнее" на карточке и перейдите в нее. Здесь можно 
                фиксировать суммы пополнений, снятий и текущую стоимость на дату.
                Получая деньги от аренды недвижимости указывайте "Снять", а при ее ремонте
                или обслуживании "Внести". С определенной периодичностью, например раз в 
                месяц, фиксируйте стоимость инвестиции (это, например, сумма на брокерском 
                счету или среднерыночная стоимость объекта недвижимости).
                </Typography>

                <Typography variant="body" component="div" sx={{ mt: "0.5rem" }}>
                4. В разделе "Отчеты" в любой момент можно посмотреть графики, 
                оценить оставание от условного индекса "ЕслиНаВклад", который показывает 
                какая сумма у Вас была бы, если бы Вы не инвестировали, а просто положили 
                деньги в банк.
                </Typography>

            </Container>
        
        </>
    )
};

export default HelpWelcomeInfo;
