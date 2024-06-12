import Link from "next/link";
import { PERSONAS } from "~/lib/constants";
import type { User } from "~/server/db/schema";

type PersonaCardProps = {
  currentUser: User;
};

const PersonaCard = ({ currentUser }: PersonaCardProps) => {
  const persona = PERSONAS.find((p) => p.persona_id === currentUser.personaId);

  return (
    <div className="card bg-neutral text-neutral-content">
      <div className="card-body">
        <h3 className="card-title">Your persona: {persona?.name}</h3>
        <p className="mb-6 text-lg text-gray-400">
          We would like to describe you as a {persona?.description}
        </p>
        <div className="card-actions justify-end">
          <Link href="/assessment/1" className="btn btn-primary">
            Retake assessment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PersonaCard;
