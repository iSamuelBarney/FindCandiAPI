import { Octokit } from "@octokit/rest";

export const create = ({ body }, res, next) => res.status(201).json(body);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  res.status(200).json([]);

async function getResults(q, res) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_PAT,
  });

  const response = await octokit.request("GET /search/users", {
    q,
    mediaType: {
      format: ["text-match"],
    },
  });
  const newResponse = { ...(response?.data || {}) };

  const newItems = {};
  for (let item of response?.data?.items || []) {
    if (item?.id) {
      newItems[item?.id] = {
        ...item,
        ...(
          (await octokit.request("GET /users/{username}", {
            username: item?.login,
          })) || { data: {} }
        )?.data,
      };
    }
  }

  newResponse.items = newItems;

  return res.json(newResponse);
}

export function show({ params = {} }, res, next) {
  try {
    return getResults(params.id, res);
  } catch (e) {
    throw e;
  }
}

export const update = ({ body, params }, res, next) =>
  res.status(200).json(body);

export const destroy = ({ params }, res, next) => res.status(204).end();
