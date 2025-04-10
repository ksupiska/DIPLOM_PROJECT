import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

type Human = {
  id: number;
  name: string;
  surname: string;
  sex: string;
};

const FamilyTree = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [sex, setSex] = useState('');
  const [city_living, setCity] = useState('');
  const [state_of_life, setStateOfLife] = useState('');
  const [cause_of_death, setCauseOfDeath] = useState('');
  const [kind, setKind] = useState('');
   //const [avatar, setAvatar] = useState('');
  const [personalities, setPersonalities] = useState<Human[]>([]);

  const fetchPersonalities = async () => {
    try {
      const response = await axios.get('http://localhost:3001/personalities');
      setPersonalities(response.data);
    } catch (error) {
      console.error('Ошибка при получении персонажей:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      await axios.post('http://localhost:3001/personalities', {
        name,
        surname,
        sex,
        city_living,
        state_of_life,
        cause_of_death,
        kind,
      });
  
      setName('');
      setSurname('');
      setSex('');
      setCity('');
      setStateOfLife('');
      setCauseOfDeath('');
      setKind('');
  
      fetchPersonalities();
    } catch (error) {
      console.error('Ошибка при добавлении персонажа:', error);
    }
  };
  

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/personalities/${id}`);
      fetchPersonalities(); // обновляем список после удаления
    } catch (error) {
      console.error('Ошибка при удалении:', error);
    }
  };

  useEffect(() => {
    fetchPersonalities();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Добавить персонажа</h1>
      <Form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <Form.Group className='mb-3' controlId='formBasicName'>
          <Form.Label>Введите имя</Form.Label>
          <Form.Control value={name} onChange={(e) => setName(e.target.value)} type='name' placeholder='Введите имя' required/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicSurname'>
          <Form.Label>Введите фамилию</Form.Label>
          <Form.Control value={surname} onChange={(e) => setSurname(e.target.value)} type='surname' placeholder='Введите фамилию' required/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicSex'>
          <Form.Label>Введите пол</Form.Label>
          <Form.Control value={sex} onChange={(e) => setSex(e.target.value)} type='sex' placeholder='Введите пол' required/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicCity'>
          <Form.Label>Выберите город проживания</Form.Label>
          <Form.Select value={city_living} onChange={(e) => setCity(e.target.value)} >
            <option value="1">Виллоу Крик</option>
            <option value="2">Оазис Спрингс</option>
            <option value="3">Ньюкрест</option>
            <option value="4">Магнолия променейд</option>
            <option value="5">Винденбург</option>
            <option value="6">Сан Мишуно</option>
            <option value="7">Форготн Холлоу</option>
            <option value="8">Бриндлтон-Бей</option>
            <option value="9">Дель-Соль-Вэлли</option>
            <option value="10">Стрейнджервилль</option>
            <option value="11">Сулани</option>
            <option value="12">Глиммербрук</option>
            <option value="13">Бритчестер</option>
            <option value="14">Эвергрин-Харбор</option>
            <option value="15">Вранбург</option>
            <option value="16">Нордхавен</option>
            <option value="17">Сиусад-Энаморада</option>
            <option value="18">Томаранг</option>
            <option value="19">Сан-Секвойя</option>
            <option value="20">Батуу</option>
            <option value="21">Сельвадорада</option>
            <option value="22">Гора Комореби</option>
            <option value="23">Гранит-Фоллз</option>
            <option value="24">Тартоза</option>
            <option value="25">Коппердейл</option>
            <option value="26">Хэнфорд-он-Бэгли</option>
            <option value="27">Мунвуд Милл</option>
            <option value="28">Честнад Ридж</option>
            <option value="29">Эвергрин Харбор</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicCity'>
          <Form.Label>Выберите состояние персонажа</Form.Label>
          <Form.Select value={state_of_life} onChange={(e) => setStateOfLife(e.target.value)}>
            <option value="1">Жив</option>
            <option value="2">Мертв</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicKind'>
          <Form.Label>Введите черты характера</Form.Label>
          <Form.Control value={kind} onChange={(e) => setKind(e.target.value)} type='kind' placeholder='Введите черты характера' required/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicKind'>
          <Form.Label>Введите причину смерти</Form.Label>
          <Form.Control value={cause_of_death} onChange={(e) => setCauseOfDeath(e.target.value)} type='cause_of_death' placeholder='Введите причину смерти' required/>
        </Form.Group>
        <Button type="submit">Сохранить</Button>
      </Form>

      <h2>Список персонажей</h2>
      <ul>
        {personalities.map((member) => (
          <li key={member.id}>
            {member.name} — {member.surname} — {member.sex}
            <Button onClick={() => handleDelete(member.id)} style={{ marginLeft: '1rem' }}>Удалить</Button>
          </li>
        ))}
      </ul>
    </div>

  );
};

export default FamilyTree;
