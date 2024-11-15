import { createContext, useState, useEffect } from 'react';

export const CarContext = createContext();

export const CarProvider = ({ children }) => {
    const [car, setCar] = useState(JSON.parse(localStorage.getItem("carManage-car")));
    const [editCar, setEditCar] = useState(JSON.parse(localStorage.getItem("carManage-editCar")) || false);

    useEffect(() => {
        const storedCar = JSON.parse(localStorage.getItem("carManage-car"));
        const storedEditCar = JSON.parse(localStorage.getItem("carManage-editCar"));
        setCar(storedCar);
        setEditCar(storedEditCar);
    }, []);

    const setEditCarByUSer = (carData, editFlag) => {
        localStorage.setItem("carManage-car", JSON.stringify(carData));
        localStorage.setItem("carManage-editCar", JSON.stringify(editFlag));
        setCar(carData);
        setEditCar(editFlag);
    };


    return (
        <CarContext.Provider value={{ car, editCar, setEditCarByUSer,setEditCar,setCar }}>
            {children}
        </CarContext.Provider>
    );
};
