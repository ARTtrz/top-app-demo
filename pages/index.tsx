import { GetStaticProps } from 'next';
import { useState } from 'react';
import { Htag, Button, P, Tag, Rating, Input, Textarea } from '../components';
import { withLayout } from '../layout/Layout';
import axios from 'axios'
import { MenuItem } from '../interfaces/menu.interface';
import { API } from '../helpers/api';


function Home({ menu, firstCategory }: HomeProps): JSX.Element {
  const [counter, setCounter] = useState(1);
  const [rating, setRating] = useState<number>(3)


  return (
    <>
      {/* <Htag tag='h1'>{counter}</Htag>
      <Button apperance='primary' arrow="right" onClick={() => setCounter(x => x + 1)}>Hello</Button>
      <Button apperance='ghost' arrow="right">Ghost</Button>
      <P size='l'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, repellendus?</P>
      <P size='s'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, possimus.</P>
      <Tag color='grey' size='s'>Hello</Tag>
      <Tag color='red' size='m'>GoodBye</Tag>
      <Rating rating={rating} isEditable setRating={setRating} />
      <ul>
        {menu.map(m => (<li key={m._id.secondCategory}>{m._id.secondCategory}</li>))}
      </ul>
      <Input placeholder='test' />
      <Textarea placeholder='test' /> */}
      Ищите свои курсы ЗДЕСЬ!!!

    </>
  )
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory
  });

  return {
    props: {
      menu,
      firstCategory
    }
  }
}

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number
}