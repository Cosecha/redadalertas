# How To Contribute

Welcome! This guide aims to get you up to speed on becoming a contributor to this project.

## Development Setup

To run this project, you will need to have the following installed:
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/)
- We recommend the open-source [Atom text editor](https://atom.io/), but you can choose whatever you like. Note: you will need to find the equivalent plugins recommended to make linting easier
  * [linter](https://atom.io/packages/linter)
  * [es-lint](https://atom.io/packages/linter-eslint)

NOTE: we will aim to have a linter you can run from the command line to not box people into a text editor.

###

### Dev Setup & Git Workflow

This is important. We will be using the git Workflow model:

1. Fork the repo
1. Clone your forked repo into your machine
  * `git clone https://github.com/<YOUR GITHUB USERNAME>/redadalertas.git`
1. Change to that directory
  * `cd redadalertas`
1. Install the Node dependencies with Yarn
  * `yarn install`
1. Start the development server
  * `yarn start`
1. Create a branch and switch to it
  * `git checkout -b <NEW BRANCH NAME>`
1. Write code
1. Commit
  * `git add --all`
  * `git commit -m "Writes a short useful message here"`
1. Repeat 4 and 5 as much as you need.
1. Submit a pull request
1. Request someone to review your code
1. Your code is reviewed
1. Discussion
1. Make any changes requested
1. Commit on the same branch (they will be added to the pull request)
1. Your code is approved and merged!

**[Here's another great explanation of Git Flow.](https://gist.github.com/celsom3/0168a96128c940a369f41f91f41b92bc)**

## Getting Started

### Project Roadmap

To start participating, we suggest you take a look at the [project roadmap](https://github.com/Cosecha/redadalertas/projects/3) to get a sense of where the project is.

### Project Backlog

Next up in level of specificity to code is the [Project Backlog](https://github.com/Cosecha/redadalertas/projects/2). Here are the user stories.

This is what guides the development work. We'll choose a couple of the most important ones to tackle, the focus on only those user stories during a few weeks. You can consider this a sprint if you are thinking in terms of Agile/Scrum development.

### Sprints

[What this video to get an idea of what we're trying to go for](https://youtu.be/9TycLR0TqFA).

For now, a sprint will be about a month. Let's try that. We can adjust as necessary.

**What happens in a sprint?**

A few user stories are chosen. Those user stories will be broken down into issues and assigned to a corresponding [milestone](https://github.com/Cosecha/redadalertas/milestones).

Most of these will also have a ['help wanted' label](https://github.com/Cosecha/redadalertas/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22). This should give you an idea of things you can start working on right away.

Find an issue you are interested in or think you can tackle. Indicate your interest by commenting on that issue. This can also help clarify the best approach etc.

You will then be assigned the issue and you can start working on a branch in your forked repo.

Once your ready. And you've written some passing tests, submit a pull request.

**What if I don't know how to write tests?**

No worries, submit a pull request anyways, and someone will walk you through how we do it.

That's pretty much the process! Thanks again for taking the time.

## Communication

Most folks start discussing the project on [Gitter](gitter.im/redadalertas/Lobby). That's a great tool to get people interested in the project to learn more. It also serves as a great place for coder and non-coders alike to discuss.

However, once you start being a contributor, you may want to ask other contributors how to approach a certain problem. Or why something was set up a certain way. For that we have a channel on the [ProgCode Slack](http://www.progcode.co/). Request to join and follow the onboarding process there.

This will also help you connect with the wider progressive tech community! We are just one humble project there, feel free to explore. Lot's of people doing great things.

### Discuss in the issues

For very code-specific discussions, it is encouraged to discuss in the relevant issues. This helps keep a written record of why some decisions were made or what conversations specific to the code were had. In general:

* Slack: general discussion about the project
* GitHub Issues: discussion relating to specific code, or issue topic
