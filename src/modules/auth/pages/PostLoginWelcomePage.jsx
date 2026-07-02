import PostLoginWelcomeCard from "../components/PostLoginWelcomeCard";
import PostLoginWelcomeShell from "../components/PostLoginWelcomeShell";
import { usePostLoginWelcome } from "../hooks/usePostLoginWelcome";

export default function PostLoginWelcomePage() {
  const { currentMessage, displayName, redirectDelayMs } =
    usePostLoginWelcome();

  return (
    <PostLoginWelcomeShell>
      <PostLoginWelcomeCard
        displayName={displayName}
        loadingMessage={currentMessage}
        redirectDelayMs={redirectDelayMs}
      />
    </PostLoginWelcomeShell>
  );
}