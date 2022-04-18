import axios from 'axios';

interface ApiData {
  data: {
    message: string;
  };
}

const getData = async (): Promise<void> => {
  const data: ApiData = await axios.get('http://hello.monoxity.dev/test');
  const post: ApiData = await axios.post('http://hello.monoxity.dev/test', {}, { headers: { Authorization: data.data.message } });
  process.stdout.write(`${post.data.message}\n`);
};

getData();
