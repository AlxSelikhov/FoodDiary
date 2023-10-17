import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, InputNumber } from "antd";

interface CalendarItem {
  id: number;
  calendar_name: string;
  date: string;
}

interface MealTimesItem {
  calendar_id: number;
  id: number;
  mealtime_name: string;
}

type FieldType = {
  mealtime_id?: number;
  meal_name?: string;
  grams?: number;
  pieces?: number;
};

function WeekListComponent() {
  const [calendarData, setCalendarData] = useState<CalendarItem[]>([]);
  const [currentWeekData, setCurrentWeekData] = useState<CalendarItem[]>([]);
  const [mealTimes, setMealTimes] = useState<MealTimesItem[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [form] = Form.useForm();

  // для отправки данных в таблицу Meal
  const [selectedMealId, setSelectedMealId] = useState<number | null>(null);
  const [meals, setMeals] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
    fetchGetMeal();
  }, []);

  // Получение данных

  const fetchData = async () => {
    try {
      const response = await axios.get<CalendarItem[]>(
        "http://127.0.0.1:8000/calendar"
      );
      setCalendarData(response.data);
      const currentDate = new Date();
      const currentWeekDates = getWeekDates(currentDate);
      const currentWeekData = response.data.filter((item: any) =>
        currentWeekDates.includes(item.calendar_name)
      );
      setCurrentWeekData(currentWeekData);
      fetchMealTimes(currentWeekData[0].id);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMealTimes = async (date: number) => {
    try {
      const response = await axios.get<MealTimesItem[]>(
        `http://127.0.0.1:8000/calendar/${date}/mealtime`
      );
      setMealTimes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGetMeal = async () => {
    try {
      const response = await axios.get<FieldType[]>(
        `http://127.0.0.1:8000/meal`
      );
      setMeals(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Отправление данных на сервер

  const fetchMeals = async (mealtime_id: any, meal: any) => {
    try {
      const response = await axios.post<FieldType[]>(
        "http://127.0.0.1:8000/meal",
        {
          mealtime_id: mealtime_id,
          meal_name: meal.meal_name,
          grams: meal.grams,
          pieces: meal.pieces,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
      console.log({
        mealtime_id: mealtime_id,
        meal_name: meal.meal_name,
        grams: meal.grams,
        pieces: meal.pieces,
      });
    }
  };

  //

  const getWeekDates = (currentDate: Date): string[] => {
    const weekDates: string[] = [];
    const firstDayOfWeek = new Date(
      currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)
    );
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayOfWeek);
      date.setDate(date.getDate() + i);
      weekDates.push(date.toISOString().split("T")[0]);
    }
    return weekDates;
  };

  const handleNextWeek = () => {
    const nextWeekDate = new Date(currentWeekData[0].calendar_name);
    nextWeekDate.setDate(nextWeekDate.getDate() + 7);
    setCurrentWeekData(
      calendarData.filter((item) =>
        getWeekDates(nextWeekDate).includes(item.calendar_name)
      )
    );
    fetchMealTimes(getWeekDates(nextWeekDate)[0]);
  };

  const handlePreviousWeek = () => {
    const previousWeekDate = new Date(currentWeekData[0].calendar_name);
    previousWeekDate.setDate(previousWeekDate.getDate() - 7);
    setCurrentWeekData(
      calendarData.filter((item) =>
        getWeekDates(previousWeekDate).includes(item.calendar_name)
      )
    );
    fetchMealTimes(getWeekDates(previousWeekDate)[0]);
  };

  //место для modal
  const showModal = (mealId: any) => {
    setSelectedMealId(mealId);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log("Selected Meal ID:", selectedMealId);
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        fetchMeals(selectedMealId, values);
        setIsModalOpen(false);
        console.log("Success:", values);
      })
      .catch((errorInfo) => {
        console.log("Failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  // строки для Form
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div>
        <button onClick={handlePreviousWeek}>Предыдущая неделя</button>
        <button onClick={handleNextWeek}>Следующая неделя</button>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        {currentWeekData.map((item: CalendarItem) => (
          <div key={item.id} style={{ marginRight: "10px" }}>
            <button onClick={() => fetchMealTimes(item.id)}>
              {item.calendar_name}
            </button>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        {mealTimes.map((meal: MealTimesItem) => (
          <div key={meal.id} style={{ marginBottom: "10px" }}>
            {currentWeekData.some((item) => item.id === meal.calendar_id) && (
              <div>
                <p style={{ fontWeight: "bold" }}>{meal.mealtime_name}</p>
                {meals
                  .filter((mealItem) => mealItem.mealtime_id === meal.id) // Фильтруем по mealtime_id
                  .map((mealItem) => (
                    <div key={mealItem.id}>
                      <p>{mealItem.meal_name}</p>
                    </div>
                  ))}
                <Button
                  type="primary"
                  onClick={() => showModal(meal.id)} // Передаем meal.id в качестве аргумента
                  style={{ margin: "10px 0" }}
                >
                  Добавить блюдо
                </Button>

                <Modal
                  title="Добавить блюдо"
                  open={isModalOpen}
                  onOk={() => handleOk()}
                  onCancel={handleCancel}
                >
                  <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <Form.Item<FieldType>
                      label="Блюдо"
                      name="meal_name"
                      rules={[
                        {
                          required: true,
                          message: "Пожалуйста, добавьте свое блюдо!",
                        },
                      ]}
                    >
                      <Input placeholder="" />
                    </Form.Item>

                    <Form.Item<FieldType>
                      label="Граммы"
                      name="grams"
                      rules={[
                        {
                          required: false,
                          message: "Пожалуйста, добавьте количество грамм!",
                        },
                      ]}
                    >
                      <InputNumber min={0} max={5000} />
                    </Form.Item>

                    <Form.Item<FieldType>
                      label="Кол-во"
                      name="pieces"
                      rules={[
                        {
                          required: false,
                          message: "Пожалуйста, добавьте количество грамм!",
                        },
                      ]}
                    >
                      <InputNumber min={0} max={5000} />
                    </Form.Item>
                  </Form>
                </Modal>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default WeekListComponent;
