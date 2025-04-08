import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      });
      setName('');
      setSurname('');
      setSex('');
      fetchPersonalities();
    } catch (error) {
      console.error('Ошибка при добавлении персонажа:', error);
    }
  };

  useEffect(() => {
    fetchPersonalities();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Добавить персонажа</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Фамилия"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Пол"
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          required
        />
        <button type="submit">Сохранить</button>
      </form>

      <h2>Список персонажей</h2>
      <ul>
        {personalities.map((p) => (
          <li key={p.id}>
            {p.name} {p.surname} — {p.sex}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FamilyTree;
