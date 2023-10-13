import { ChangeEventHandler, useEffect, useState } from "react";
import { Header } from "../components/header/header";
import { LinkOutput } from "../components/link-output/link-output";
import { PassphraseInput } from "../components/passphrase-input/passphrase-input";
import { PasswordInput } from "../components/password-input/password-input";
import { QuestionsAndAnswers } from "../components/questions-and-answers/questions-and-answers";
import { Message } from "../library/message/message";
import { EncryptedData, encrypt } from "../utils/encrypt";
import { useDebounce } from "../utils/use-debounce";
import "./app.scss";

export const App = () => {
  const [password, setPassword] = useState<string>();
  const [passphrase, setPassphrase] = useState<string>();
  const debouncedPassword = useDebounce<string | undefined>(password, 300);
  const debouncedPassphrase = useDebounce<string | undefined>(passphrase, 300);
  const [isEncrypting, setIsEncrypting] = useState<boolean>(false);
  const [encryptedData, setEncryptedData] = useState<EncryptedData>();
  const hasPassword = !!password?.trim();
  const hasPassphrase = !!passphrase?.trim();

  useEffect(() => {
    setIsEncrypting(true);

    if (!password?.trim() || !passphrase?.trim()) {
      setEncryptedData(undefined);
      setIsEncrypting(false);
    }
  }, [password, passphrase]);

  useEffect(() => {
    let isCancelled = false;

    const encryptValues = async () => {
      if (debouncedPassword?.trim() && debouncedPassphrase?.trim()) {
        try {
          const encrypted = await encrypt({
            plaintext: debouncedPassword,
            passphrase: debouncedPassphrase,
          });

          if (!isCancelled) {
            setEncryptedData(encrypted);
            setIsEncrypting(false);
          }
        } catch (error) {
          if (!isCancelled) console.error("Failed to decrypt", error);
        }
      }
    };

    void encryptValues();

    return () => {
      isCancelled = true;
    };
  }, [debouncedPassword, debouncedPassphrase]);

  const passphraseDisabled = !hasPassword && !hasPassphrase;
  const linkOutputDisabled = !hasPassword || !hasPassphrase;

  const onPasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  const onPassphraseChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassphrase(e.target.value);
  };

  return (
    <div className="app flex h-screen flex-col">
      <Header />
      <main className="mx-auto mb-6 max-w-xl self-start overflow-y-auto rounded-xl bg-[rgba(255,255,255,0.8)] p-6 shadow-xl backdrop-blur-md">
        <p className="mb-4 text-xl font-semibold">
          Encrypted password sharing was never this easy
        </p>
        <Message className="my-4 bg-purple-200 text-purple-800">
          <>
            Your <strong>password is stored</strong> inside the Link you will
            send to the recipent and <strong>not on any of our servers</strong>.
          </>
        </Message>
        <PasswordInput
          onPasswordChange={onPasswordChange}
          password={password}
        />
        <PassphraseInput
          onPassphraseChange={onPassphraseChange}
          passphrase={passphrase}
          disabled={passphraseDisabled}
        />
        <LinkOutput
          disabled={linkOutputDisabled}
          encryptedData={encryptedData}
          loading={isEncrypting}
        />
        <Message
          className={`my-4 bg-emerald-200 text-emerald-800 
                      opacity-${linkOutputDisabled ? "30" : "100"}`}
        >
          <>
            The recipient needs the passphrase to decrypt your password. Be sure
            to&nbsp;
            <strong>
              transfer the link and passphrase on two different channels to make
              the exchange secure.
            </strong>
          </>
        </Message>
        <hr />
        <QuestionsAndAnswers />
      </main>
    </div>
  );
};
