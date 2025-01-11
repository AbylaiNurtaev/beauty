import "./index.css";
import ExpertComponent from "../../DifficultComponents/ExpertComponent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Buttons/Button";

const ExpertList = () => {
  const navigate = useNavigate();
  const [expertId, setExpertId] = useState();
  const [experts, setExperts] = useState([]);
  const [choosenExpert, setChoosenExpert] = useState("");
  const title = localStorage.getItem('title');

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        // Получаем список специалистов
        const response = await fetch("https://demo.beautywebapp.ru/api/specialists/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include"
        });

        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }

        const specialists = await response.json();
        

        // Если есть title, фильтруем специалистов
        if (title) {
          const filteredExperts = await Promise.all(specialists.map(async (expert) => {
            const serviceResponse = await fetch(`https://demo.beautywebapp.ru/api/offers/specialist/${expert.id}/services`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include"
            });

            if (!serviceResponse.ok) {
              throw new Error("Service fetch failed for expert " + expert.id);
            }

            const services = await serviceResponse.json();
            
            console.log(services.some((service, idx) => service?.toLowerCase() == title?.toLowerCase()) ? expert : null);
            
            // Проверяем, есть ли услуга с указанным title
            return services.some((service, idx) => service?.toLowerCase() == title?.toLowerCase()) ? expert : null;
          }));

          setExperts(filteredExperts.filter(expert => expert !== null));
        } else {
          setExperts(specialists);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchExperts();
  }, [title]);

  const handleSubmit = () => {
    localStorage.setItem('expert', choosenExpert);
    localStorage.setItem('expertId', expertId);
    const service = localStorage.getItem('serviceId');
    const time = localStorage.getItem('time');

    if (service && time) {
      navigate("/confirmation");
    } else if (!service) {
      navigate("/choose-service");
    } else if (!time) {
      navigate("/choose-time");
    }
  };

  return (
    <div className="expert_list">
      <ExpertComponent
        active={choosenExpert === ""}
        onClick={() => setChoosenExpert("")}
      />
      {experts && experts.map((expert) => {
        return (
          <ExpertComponent
            key={expert.id}
            expert={expert}
            active={choosenExpert === expert.fio}
            onClick={() => { setChoosenExpert(expert.fio); setExpertId(expert.id); }}
          />
        );
      })}
      {
        choosenExpert && <div style={{ position: "fixed", bottom: "20px", width: "90%" }}>
          <Button onClick={() => handleSubmit()}>Записаться</Button>
        </div>
      }
    </div>
  );
};

export default ExpertList;
