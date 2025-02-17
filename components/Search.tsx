import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GoX } from 'react-icons/go';

interface FormValues {
  searchQuery: string;
}
export interface SearchProps {
  searchBarWrapperStyles?: string;
}

export default function Search({ searchBarWrapperStyles }: SearchProps) {
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      searchQuery: router.query.q as string
    }
  });

  const onSubmit: SubmitHandler<FormValues> = ({ searchQuery }) => {
    let trimmedQuery = searchQuery.trim();
    //Performs search only with non-empty strings
    if (trimmedQuery !== '') {
      router.push({ query: { ...router.query, q: trimmedQuery } });
    }
  };

  return (
    <div className={searchBarWrapperStyles}>
      <form
        className="w-full mx-auto m-2 form-control"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative">
          <input
            placeholder="Search"
            className="w-full text-neutral-100 pr-16 input input-bordered border-2023-bavarian-gold-2 focus:outline-2023-bavarian-gold-2 bg-transparent"
            type="text"
            {...register('searchQuery', { required: true })}
          />
          <button
            className="absolute top-0 right-0 rounded-l-none btn btn-ghost"
            type="button"
            onClick={() => reset()}
          >
            <GoX color="white" />
          </button>
        </div>
      </form>
    </div>
  );
}
