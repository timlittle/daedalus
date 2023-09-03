
import {parseISO, format} from 'date-fns';

interface StoryProps {
    title: string;
    dateString: string;
    description: string
}

const Story: React.FC<StoryProps> = ({
    title,
    dateString,
    description
}) => {

    const date = parseISO(dateString);
    return (
        <article>
        <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0 py-2">
          <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>
            </dd>
          </dl>
          <div className="space-y-5 xl:col-span-3">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold leading-8 tracking-tight">
                  {title}
                </h2>
              </div>
              <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                {description}
              </div>
            </div>
          </div>
        </div>
      </article>
    );
}
 
export default Story;