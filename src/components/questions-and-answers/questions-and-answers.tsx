import { Accordeon } from "../../library/accordeon/accordeon";
import { Link } from "../../library/link/link";

export const QuestionsAndAnswers = () => {
  return (
    <>
      <p className="my-4 text-center font-semibold">Q&A</p>
      <Accordeon
        title="Why not just send my password directly?"
        className="mt-4"
      >
        <p className="mb-2">
          <b>Short</b>: Sending a password encrypted is like giving a locked box
          and sharing the key separately, so even if someone finds the box, they
          can&apos;t open it without the key.
        </p>
        <p className="mb-2">
          <b>Explained like you&apos;re 5</b>: Imagine you have a secret toy 🧸
          that you want to give to your friend at school, but you don&apos;t
          want anyone else to see or take it. You could just give it to your
          friend directly, but what if someone is watching? That&apos;s like
          sending a password via sms; someone might be spying and see the
          password.
        </p>
        <p className="mb-2">
          Now, instead of giving the toy directly, you put it inside a magic box
          🎁 that can only be opened with a special key. You give the box to
          your friend at school. But, you give the key to your friend at the
          park later. Even if someone saw you give the box, they can&apos;t open
          it without the key!
        </p>
        <p>
          Sending an encrypted password is like giving the locked magic box.
          Sharing the secret over a second channel is like giving the key
          separately. This way, even if someone sees one part, they can&apos;t
          get the full secret without the other part. It&apos;s safer because
          it&apos;s harder for bad people to get both the box and the key.
        </p>
      </Accordeon>
      <Accordeon title="I'm not giving you my password!" className="mt-4">
        <p>
          <strong>We never receive your password.</strong> All encryption is
          done locally on your device. There are no backdoors built in. Feel
          free to review the code on&nbsp;
          <Link href={import.meta.env.VITE_GITHUB_REPO_URL} target="_blank">
            Github
          </Link>
          .
        </p>
      </Accordeon>
    </>
  );
};
