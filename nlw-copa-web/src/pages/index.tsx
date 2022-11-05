import { GetStaticProps } from 'next';
import Image from 'next/image';
import { toast } from 'react-toastify';
import NLWPreview from '../../public/assets/app-nlw-copa-preview.png';
import Logo from '../../public/assets/logo.svg';
import UsersAvatarExample from '../../public/assets/users-avatar-example.png';
import IconCheck from '../../public/assets/icon-check.svg';
import { api } from '../services/api.service';
import { FormEvent, useState } from 'react';

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

const Home: React.FC<HomeProps> = ({ poolCount, guessCount, userCount }) => {
  const [poolTitle, setPoolTitle] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const createPool = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      const { data } = await api.post<{ code: string }>('/pools', {
        title: poolTitle
      });
      setCode(data.code);
      setPoolTitle('');
      toast.success('Bolão criado com sucesso!');
    } catch (err) {
      toast.error('Ops! Algo deu errado, tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    toast.success('Código copiado com sucesso!');
  };

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center gap-28">
      <main>
        <Image src={Logo} alt="Logo NLW Copa" />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image
            src={UsersAvatarExample}
            alt="Ilustração de usuários já cadastrados"
          />

          <strong className="text-gray-100 text-xl">
            <span className="text-success-500">+{userCount} </span>
            pessoas já estão usando
          </strong>
        </div>

        <form onSubmit={createPool} className="mt-10 flex gap-2">
          {code ? (
            <div className="h-10 flex-1 text-center items-center justify-between px-6 py-2 rounded bg-success-500 border border-success-500 tx-sm text-gray-100">
              {code}
            </div>
          ) : (
            <>
              <input
                value={poolTitle}
                onChange={event => setPoolTitle(event.target.value)}
                className="h-10 flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 tx-sm text-gray-100"
                type="text"
                required
                placeholder="Qual nome do bolão que deseja criar?"
              />
              <button
                className="w-36 bg-waring-500 px-6 h-10 rounded text-gray-900 font-bold text-sm uppercase hover:bg-waring-700"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <div>
                    <svg
                      className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-200 fill-success-500"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>
                ) : (
                  'Criar Bolão'
                )}
              </button>
            </>
          )}
        </form>

        {code ? (
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => setCode('')}
              className="border border-waring-500 px-6 h-10 rounded flex-1 text-waring-500 font-bold text-sm uppercase hover:bg-gray-800 hover:border-waring-700 hover:text-waring-700"
            >
              Criar novo bolão
            </button>
            <button
              onClick={copyCode}
              className="bg-waring-500 px-6 h-10 rounded flex-1 text-gray-900 font-bold text-sm uppercase hover:bg-waring-700"
            >
              Copiar código
            </button>
          </div>
        ) : (
          <p className="mt-4 text-sm text-gray-300 leading-relaxed">
            Após criar seu bolão, você receberá um código único que poderá usar
            para convidar seus amigos
          </p>
        )}

        <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={IconCheck} alt="check" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-600" />

          <div className="flex items-center gap-6">
            <Image src={IconCheck} alt="check" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>
      <Image
        src={NLWPreview}
        alt="Prévia da versão mobile da nlw-copa"
        quality={100}
      />
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const [poolCount, guessCount, userCount] = await Promise.all([
    api.get('/pools/count'),
    api.get('/guesses/count'),
    api.get('/users/count')
  ]);
  return {
    props: {
      poolCount: poolCount.data.count,
      guessCount: guessCount.data.count,
      userCount: userCount.data.count
    },
    revalidate: 60 * 20 // 20 minutes
  };
};
