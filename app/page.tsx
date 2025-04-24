import { Pump } from "basehub/react-pump";
import { RichText } from "basehub/react-rich-text";
import { Tweet } from "react-tweet";

export default function Home() {
  return (
    <Pump
      queries={[
        {
          indexPage: {
            title: {
              json: {
                content: true,
                blocks: {
                  on_BlockDocument: {
                    __typename: true,
                    _id: true,
                  },
                  on_TweetComponent: {
                    id: true,
                  },
                },
              },
            },
          },
        },
      ]}
    >
      {async ([{ indexPage }]) => {
        "use server";
        return (
          <RichText
            content={indexPage.title.json.content}
            blocks={indexPage.title.json.blocks}
            components={{
              TweetComponent: ({ id }) => {
                return <Tweet id={id} />;
              },
            }}
          />
        );
      }}
    </Pump>
  );
}
